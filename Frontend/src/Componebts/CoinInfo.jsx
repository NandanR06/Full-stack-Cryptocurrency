import React from 'react';
import { useParams } from 'react-router-dom';

export default function CoinInfo() {
  const {id}=useParams();
  return (
    <div>
      coin  {id}
    </div>
  )
}
