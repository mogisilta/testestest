import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { Loading } from './Lodaing';
import PageButton from './PageButton';
import { getClubdata } from '../api/MypageApi/getClubApi';
import { Link } from 'react-router-dom';

const Clubtable = () => {
    const [pagenumber, setPageNumber] = useState(1);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['myclub', pagenumber],
        queryFn: () => getClubdata(pagenumber),
    });

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <>
                <h3>Oops, someting went wrong</h3> <p>{error.toString()}</p>
            </>
        );
    const totalElements = data.pageInfo.totalElements;
    const Maxpage = Math.ceil(totalElements / 20);
    const MaxpageArray = Array.from({ length: Maxpage }, (_, index) => index + 1);

    const NextpageHandler = () => {
        if (pagenumber < Maxpage) {
            setPageNumber((previous) => previous + 1);
        }
    };

    const PreviouspageHandler = () => {
        if (pagenumber > 1) {
            setPageNumber((previous) => previous - 1);
        }
    };

    const CurrentPageHandler = (number) => {
        setPageNumber(number);
    };
    return (
        <div>
            <Styledwrapper>
                <div></div>
                <div>제목</div>
                <div>작성일</div>
                <div>조회</div>
                <div>상태</div>
            </Styledwrapper>
            {data.postData.map((post) => {
                return <Tablecontent post={post}></Tablecontent>;
            })}
            <PageContainer>
                <PageButton data={{ value: '이전' }} onClick={PreviouspageHandler} />
                {MaxpageArray.map((value, idx) => (
                    <PageButton
                        key={idx}
                        data={{ value }}
                        onClick={() => {
                            CurrentPageHandler(value);
                        }}
                    />
                ))}

                <PageButton data={{ value: '다음' }} onClick={NextpageHandler} />
            </PageContainer>
        </div>
    );
};

const Tablecontent = ({ post }) => {
    const url = `/club/detail/${post.boardClubId}`;
    return (
        <Styledwrapper>
            <div>{post.boardClubId}</div>
            <StyledLink to={url}>{post.title}</StyledLink>
            <div>{moment(post.createdAt).format('YYYY-MM-DD')}</div>
            <div>{post.view}</div>
            <div>{post.boardClubStatus === 'BOARD_CLUB_RECRUITING' && '❌'}</div>
        </Styledwrapper>
    );
};
//완료일경우 O 표시로 바꿔주기 -> O 가될경우 게시물 자동삭제되게하기??

const Styledwrapper = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 800px;
    height: 30px;
    font-size: 1rem;
    display: grid;
    grid-template-columns: 3fr 14fr 6fr 5fr 2fr;
    vertical-align: center;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        color: rgba(0, 0, 0, 0.5);
    }
`;

const PageContainer = styled.ul`
    padding: 0;
    position: absolute;
    right: 10%;
    width: 700px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    > li {
        margin: 0 3px 0 3px;
        border: none;
    }
`;

export default Clubtable;
