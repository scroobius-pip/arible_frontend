import dynamic from 'next/dynamic';
// export { default } from './EditSection';

export default dynamic(() => import('./EditSection'), {
    ssr: false,
});