/** @format */

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
	return useQuery(["session"], getSession, {
		staleTime: Infinity,
		refetchOnWindowFocus: false,
	});
}

async function getSession(): Promise<SessionObject | null> {
	try {
		const { status, data: res } = await axios.get<SessionObject>(
			"/api/auth/session",
			{
				withCredentials: true,
			}
		);
		return { email: res.email, id: res.id };
	} catch (err) {
		return null;
	}
}
