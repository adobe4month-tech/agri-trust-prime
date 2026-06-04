<?php
declare(strict_types=1);
namespace KissanCares;

class Router {
    public string $prefix = '';
    private array $routes = [];

    public function get(string $p, array $h): void    { $this->add('GET', $p, $h); }
    public function post(string $p, array $h): void   { $this->add('POST', $p, $h); }
    public function put(string $p, array $h): void    { $this->add('PUT', $p, $h); }
    public function patch(string $p, array $h): void  { $this->add('PATCH', $p, $h); }
    public function delete(string $p, array $h): void { $this->add('DELETE', $p, $h); }

    private function add(string $method, string $path, array $handler): void {
        $this->routes[] = ['method' => $method, 'path' => $path, 'handler' => $handler];
    }

    public function dispatch(): void {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
        if ($this->prefix && str_starts_with($uri, $this->prefix)) {
            $uri = substr($uri, strlen($this->prefix)) ?: '/';
        }
        $method = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes as $r) {
            if ($r['method'] !== $method) continue;
            $regex = '#^' . preg_replace('#\{([a-zA-Z_]+)\}#', '(?P<$1>[^/]+)', $r['path']) . '$#';
            if (preg_match($regex, $uri, $m)) {
                $params = array_filter($m, 'is_string', ARRAY_FILTER_USE_KEY);
                [$class, $action] = $r['handler'];
                try {
                    $body = json_decode(file_get_contents('php://input') ?: 'null', true);
                    $resp = (new $class())->$action($params, $_GET, is_array($body) ? $body : []);
                    echo json_encode($resp);
                } catch (\Throwable $e) {
                    http_response_code($e->getCode() >= 400 && $e->getCode() < 600 ? $e->getCode() : 500);
                    echo json_encode(['message' => $e->getMessage()]);
                }
                return;
            }
        }
        http_response_code(404);
        echo json_encode(['message' => 'Not found', 'path' => $uri]);
    }
}
