export interface Post {
	identifier: string;
	title: string;
	body?: string;
	slug: string;
	subName: string;
	createdAt: string;
	updatedAt: string;
	username: string;
	// virtual fields
	url: string;
	voteScore?: number;
	commentCount: number;
	userVote?: number;
}
