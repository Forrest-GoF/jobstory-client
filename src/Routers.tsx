import { Login, JobSearch, JobDetail, NotFound, OAuthRedirectKaKao } from '@/pages';
import { Routes, Route } from 'react-router-dom';

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<JobSearch />} />
			<Route path="/jobs/:jobId" element={<JobDetail />} />
			<Route path="/login" element={<Login />} />
			<Route path="/oauth/callback/kakao" element={<OAuthRedirectKaKao />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Routers;
