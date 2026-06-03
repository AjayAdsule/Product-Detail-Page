import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <main className="container">Main page loaded</main>;
}
