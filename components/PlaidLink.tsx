import { usePlaidLink } from 'react-plaid-link';
import { useState, useCallback } from 'react';
import axios from 'axios';

export function PlaidLink({ onSuccess }: { onSuccess: () => void }) {
  const [token, setToken] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    const response = await axios.post('/api/create_link_token');
    setToken(response.data.link_token);
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess: async (public_token, metadata) => {
      await axios.post('/api/exchange_public_token', { public_token });
      onSuccess();
    },
  });

  return (
    <button onClick={() => (token ? open() : getToken())} disabled={!ready}>
      Connect a bank account
    </button>
  );
}
