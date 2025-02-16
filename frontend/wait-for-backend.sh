#!/bin/sh

BACKEND_HOST="backend"
BACKEND_PORT="8080"
HEALTH_ENDPOINT="http://$BACKEND_HOST:$BACKEND_PORT/api/health"

echo "Waiting for backend to be ready..."

while ! curl -s $HEALTH_ENDPOINT >/dev/null; do
    sleep 1
done

echo "Backend is ready! Starting frontend..."
exec "$@" 