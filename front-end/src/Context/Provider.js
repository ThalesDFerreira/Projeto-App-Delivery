import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

function Provider({ children }) {
  const [a, seta] = useState('a');
  const contextValue = useMemo(() => ({
    a,
    seta,
  }), [a, seta]);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
