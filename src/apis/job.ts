import { GET, PATH } from '@/constants/api';
import { requester } from '@/apis/requester';
import { JobListItemsResponse, JobDetailResponse } from '@/types/apis/job';

export const getJobs = async () => {
	const {
		job: { index },
	} = PATH;

	const { data } = await requester<JobListItemsResponse>({
		method: GET,
		url: index,
	});

	return data?.jobs;
};

export const getJob = async (jobId: number) => {
	const {
		job: { index },
	} = PATH;

	const { data } = await requester<JobDetailResponse>({
		method: GET,
		url: `${index}/${jobId}`,
	});

	return data;
};
