import React from 'react';
import styled from 'styled-components';
import Comment from '../components/Comment.tsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { usePostHeader } from '../api/getHeader.ts';
type CommentInput = {
    Content: string;
};
type Comment = {
    memberId: number;
    name: string;
    memberProfileImg: string;
    content: string;
    registeredAt: string;
    modifiedAt: string | null;
};

interface DetailCommentSectionProps {
    comment: Comment[];
}
const DetailCommentSection = ({ comment }: DetailCommentSectionProps) => {
    const boardType = location.pathname.split('/')[1] === 'community' ? 'boardcomments' : 'clubcomments';
    const { register, handleSubmit, reset } = useForm<CommentInput>({ mode: 'onSubmit' });
    const headers = usePostHeader(); 
    //댓글 작성 요청
    const onSubmit: SubmitHandler<CommentInput> = (data) => {
        // console.log(data);
        // 댓글 작성 post api 요청
        const API_URL = import.meta.env.VITE_KEY;
        const payload = {
            content: `${data.Content}`,
        };
        axios
            .post(`${API_URL}/${boardType}`, payload, headers)
            .then((res) => console.log(res.status))
            .catch((error) => console.error(error));
        reset();
        alert('댓글작성 완료!');
    };

    return (
        <CommentSection>
            <CreateCommentSpace>
                <label htmlFor="commentInput">댓글작성</label>
                <StyledForm onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        id="commentInput"
                        placeholder="댓글 내용을 입력해주세요"
                        {...register('Content', {
                            required: true,
                        })}
                    />
                    <button type="submit">작성</button>
                </StyledForm>
            </CreateCommentSpace>
            <div>
                {comment?.map((commentData) => (
                    <Comment commentData={commentData} />
                ))}
            </div>
        </CommentSection>
    );
};

export default DetailCommentSection;

const CommentSection = styled.section`
    border-bottom: 1px solid #d9d9d9;
`;

const StyledForm = styled.form`
    width: 100%;
`;
const CreateCommentSpace = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    border-bottom: 1px solid #d9d9d9;
    margin-top: 20px;
    padding-bottom: 15px;
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        > div {
            width: 750px;
            display: flex;
            justify-content: end;
        }
    }
    label {
        font-size: 20px;
        font-weight: 600;
    }
    textarea {
        font-size: 17px;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: start;
        padding: 8px 8px 8px 8px;
        border-radius: 5px 0px 0px 5px;
        margin-top: 10px;
        resize: none;
        &:focus {
            outline: solid 1px #3884d5;
        }
    }
    button {
        width: 50px;
        height: 100px;
        background-color: #3884d5;
        color: #ffffff;
        border-radius: 0px 5px 5px 0px;
        margin-top: 10px;
        padding: 8px 8px 8px 8px;
    }
`;
