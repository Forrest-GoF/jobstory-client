import { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Chip from './Chip';
import * as S from './styled';
import { JOB_SEARCH_SELECT_ITEMS } from '@/constants/job';

type Props = {
	onJobSearchQueryStringChange: (queryString: string) => void;
};

const JobSearchForm = (props: Props) => {
	const [selectedFilter, setSelectedFilter] = useState<{
		[key: string]: any;
		tags: string[];
		type: string;
		minEmployees: string;
		minSalary: string;
		sortedBy: string;
	}>({
		tags: [],
		type: '',
		minEmployees: '',
		minSalary: '',
		sortedBy: '',
	});

	const handleKeywordChange = (key: string, value: string) => {
		const newKeywords = Array.from(new Set([...selectedFilter.tags, value]));
		setSelectedFilter({ ...selectedFilter, [key]: newKeywords });
	};

	const handleSelectFilterChange = (key: string, value: string) => {
		setSelectedFilter({ ...selectedFilter, [key]: value });
	};

	const handleChipDelete = (key: string, value: string) => {
		if (key === 'tags') {
			const filteredTags = selectedFilter.tags.filter((tag) => tag !== value);
			setSelectedFilter({ ...selectedFilter, [key]: filteredTags });
			return;
		}

		setSelectedFilter({ ...selectedFilter, [key]: '' });
	};

	const handleSelectedFilterReset = () => {
		setSelectedFilter({
			tags: [],
			type: '',
			minEmployees: '',
			minSalary: '',
			sortedBy: '',
		});
	};

	const getFilterQueryString = () => {
		const vaildFilterObj = Object.keys(selectedFilter)
			.filter((filterKey) => selectedFilter[filterKey].length > 0)
			.reduce((acc, filterKey) => ({ ...acc, [filterKey]: selectedFilter[filterKey] }), {});

		const queryString = Object.entries(vaildFilterObj)
			.map((e) => e.join('='))
			.join('&');

		return queryString;
	};

	const isSelectedSomeFilter = () => {
		return Object.values(selectedFilter).some((val) => val.length > 0);
	};

	useEffect(() => {
		const queryString = getFilterQueryString();
		props.onJobSearchQueryStringChange(queryString);
	}, [selectedFilter]);

	return (
		<S.Container>
			<S.InputWrapper>
				<Input placeholder="기술 스택 검색" onKeywordChange={handleKeywordChange} />
			</S.InputWrapper>
			<S.SelectWrapper>
				{JOB_SEARCH_SELECT_ITEMS.map((selectItem) => {
					return (
						<Select
							key={selectItem.id}
							placeholder={selectItem.placeholder}
							dropdownItems={selectItem.dropdownItems}
							selectedValue={selectedFilter[selectItem.dropdownItems[0]?.name]}
							onSelectFilterChange={handleSelectFilterChange}
						/>
					);
				})}
			</S.SelectWrapper>
			{isSelectedSomeFilter() && (
				<S.SelectedFilterChips>
					{selectedFilter.tags?.map((tag, idx) => {
						return (
							<Chip
								key={idx}
								color="#e17055"
								bgColor="#f9e2dd"
								filterKey="tags"
								filterValue={tag}
								onChipDelete={handleChipDelete}
							>
								{tag}
							</Chip>
						);
					})}
					{selectedFilter.type && (
						<Chip
							color="#0095a3"
							bgColor="#cceaed"
							filterKey={'type'}
							filterValue={selectedFilter.type}
							onChipDelete={handleChipDelete}
						>
							{selectedFilter.type && `${selectedFilter.type}`}
						</Chip>
					)}
					{selectedFilter.minEmployees && (
						<Chip
							color="#0984e3"
							bgColor="#cee6f9"
							filterKey="minEmployees"
							filterValue={selectedFilter.minEmployees}
							onChipDelete={handleChipDelete}
						>
							{selectedFilter.minEmployees}명 이상
						</Chip>
					)}
					{selectedFilter.minSalary && (
						<Chip
							color="#6c5ce7"
							bgColor="#e2defa"
							filterKey="minSalary"
							filterValue={selectedFilter.minSalary}
							onChipDelete={handleChipDelete}
						>
							{selectedFilter.minSalary}원 이상
						</Chip>
					)}
					{selectedFilter.sortedBy && (
						<Chip
							color="#636e72"
							bgColor="#e0e2e3"
							filterKey="sortedBy"
							filterValue={selectedFilter.sortedBy}
							onChipDelete={handleChipDelete}
						>
							{selectedFilter.sortedBy === 'POSTED' ? '최신순' : '마감순'}
						</Chip>
					)}

					<S.SelectedFilterResetButton type="button" onClick={handleSelectedFilterReset}>
						전체 초기화
					</S.SelectedFilterResetButton>
				</S.SelectedFilterChips>
			)}
		</S.Container>
	);
};

export default JobSearchForm;
