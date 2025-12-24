'use client';

import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
    credentials: 'include',
  });

  let wsLink: WebSocketLink | null = null;
  
  if (typeof window !== 'undefined') {
    const wsClient = new SubscriptionClient(
      process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/graphql',
      {
        reconnect: true,
        connectionParams: () => {
          try {
            const token = localStorage.getItem('token');
            return token ? { authorization: `Bearer ${token}` } : {};
          } catch {
            return {};
          }
        },
      }
    );
    
    wsLink = new WebSocketLink(wsClient);
  }

  const authLink = setContext((_, { headers }) => {
    let token: string | null = null;
    
    if (typeof window !== 'undefined') {
      try {
        token = localStorage.getItem('token');
      } catch {
        token = null;
      }
    }
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const splitLink = typeof window !== 'undefined' && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            books: {
              merge(existing = [], incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
      },
    },
    ssrMode: typeof window === 'undefined',
  });
}

export const apolloClient = createApolloClient();

