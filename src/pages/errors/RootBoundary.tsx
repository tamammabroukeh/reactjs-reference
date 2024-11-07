import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootBoundary() {
    const error = useRouteError();
    console.log(error);
    console.log(isRouteErrorResponse(error));

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <div>This page exist!</div>;
        }

        if (error.status === 401) {
            return <div>You authorized to see this</div>;
        }

        if (error.status === 503) {
            return <div>Looks like our API is down</div>;
        }
        if (error.status === 455) {
            return <div>🫖</div>;
        }
    }

    return <div>Something went wrong</div>;
}
