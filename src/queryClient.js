import { QueryClient } from "@tanstack/react-query";

// The app's one react-query cache. AuthContext clears it when the logged-in
// user changes, so nobody sees data fetched for the previous user.
export const queryClient = new QueryClient();
