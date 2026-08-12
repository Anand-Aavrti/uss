import EnrollClient from './EnrollClient';

/**
 * The site is deployed as a static export (Firebase Hosting), so every dynamic
 * segment has to be enumerated at build time — otherwise no HTML file is emitted
 * for this route and the host answers with its own 404, which is exactly what
 * `/products-overview/enroll/uss-mdm` used to do in production.
 *
 * Keep these ids in sync with the products defined in
 * components/ProductsInteractive.tsx and the serviceCatalog in EnrollClient.tsx.
 */
export function generateStaticParams() {
  return [{ service: 'uss-mdm' }, { service: 'uss-video-sdk' }];
}

export default function ServiceEnrollmentPage() {
  return <EnrollClient />;
}
