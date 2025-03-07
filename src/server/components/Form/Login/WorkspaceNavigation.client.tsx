import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WorkspaceNavigationTypes } from "./types";

const hasPermission = async (gqlUrl: string, permission: string, path: string) => {
  const response = await fetch(gqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      query: /* GraphQL */ `
        query ($path: String!, $permission: String!) {
          jcr {
            nodeByPath(path: $path) {
              site {
                hasPermission(permissionName: $permission)
              }
            }
          }
        }
      `,
      variables: { path, permission },
    }),
  });

  const data = await response.json();
  return data.data.jcr.nodeByPath.site.hasPermission;
};

const WorkspaceNavigationClient = ({ urls, mode, nodePath }: WorkspaceNavigationTypes) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasJContentPermission, setHasJContentPermission] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      setHasJContentPermission(await hasPermission(urls.gqlUrl, "jContentAccess", nodePath));
      setIsLoading(false);
    };

    getPermissions();
  }, [nodePath, urls.gqlUrl]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {mode !== "live" && (
        <li>
          <a href={urls.liveUrl}>{t("form.login.liveWorkspace")}</a>
        </li>
      )}

      {mode !== "preview" && hasJContentPermission && (
        <li>
          <a href={urls.previewUrl}>{t("form.login.previewWorkspace")}</a>
        </li>
      )}

      {mode !== "edit" && hasJContentPermission && (
        <li>
          <a href={urls.editUrl}>{t("form.login.editWorkspace")}</a>
        </li>
      )}
    </>
  );
};

export default WorkspaceNavigationClient;
