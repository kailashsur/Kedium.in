"use client";

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import apollo_client from './client';

const CustomApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={apollo_client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;