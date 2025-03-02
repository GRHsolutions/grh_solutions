import React, { Suspense } from 'react';
import CenteredLoader from '../generics/centeredLoader/centeredLoader';

const useSuspenseLoader = (Component: React.LazyExoticComponent<any>) => {
    return (
        <Suspense fallback={<CenteredLoader />}>
            <Component />
        </Suspense>
    );
};

export default useSuspenseLoader;
