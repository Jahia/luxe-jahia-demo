---
# Allowed version bumps: patch, minor, major
luxe-jahia-demo: patch
---

## Fix second import failure by removing cross-site group membership reference (live)

### Context
When importing the Luxe prepackaged site a second time, the import process could fail with an `ItemNotFoundException` during reference resolution. The issue was triggered by a cross-site group membership reference in the *live* repository export.

### What changed
Removed (in **live** only) the `jnt:member` entry under:

`/sites/luxe2/groups/site-privileged/...`

that pointed to:

`j:member="#/sites/luxe/groups/realtors"`

### Why
This cross-site membership link is not required for live access control in our setup (verified by restricting a page to the `realtor` group without any access regression), but it breaks idempotency of repeated imports by causing references to point to nodes that may be cleaned up/recreated during the second import.

### Result
- Second import of the Luxe prepackaged site no longer fails
- No observed impact on live permissions for realtor-restricted pages
