import { BaseController } from './base-controller';

type RouteHandler = (
  req: Request,
  controller: BaseController
) => Promise<Response>;

export function createRouteHandler(handler: RouteHandler) {
  return async function(req: Request) {
    try {
      const controller = new (class extends BaseController {})();
      return await handler(req, controller);
    } catch (error) {
      console.error('Route error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}