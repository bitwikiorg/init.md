declare const octokit: import("@octokit/core").Octokit & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
} & import("@octokit/plugin-paginate-graphql").paginateGraphQLInterface & import("@octokit/plugin-rest-endpoint-methods").Api & {
    retry: {
        retryRequest: (error: import("octokit").RequestError, retries: number, retryAfter: number) => import("octokit").RequestError;
    };
};
export { octokit };
