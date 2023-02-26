import { Outlet } from '@remix-run/react';

import marketingStyles from '~/styles/marketing.css';
import MainHeader from '../components/navigation/MainHeader';
import { getUserFromSession } from '../data/auth.server';

export default function ExpensesAppLayout() {
    return (
        <>
            <MainHeader/>
            <Outlet/>
        </>
    )
}

export function links() {
    return [{rel: 'stylesheet', href: marketingStyles}]
}

export function loader({request}) {
    return getUserFromSession(request);
}

export function headers() {
    return {
      'Cache-Control': 'max-age=3600' // 60 min
    }
}