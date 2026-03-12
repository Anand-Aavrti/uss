// Dashboard routes are public by default.
// Individual pages handle their own auth redirects as needed.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
