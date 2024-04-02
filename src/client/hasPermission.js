export const hasPermission = async (permission, path) => {
    const response = await fetch('/modules/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query {
                jcr {
                    nodeByPath(path: "${path}") {
                        site {
                            hasPermission(permissionName: "${permission}")
                        }
                    }
                }
            }`})
    });

    const data = await response.json();
    return data.data.jcr.nodeByPath.site.hasPermission;
}