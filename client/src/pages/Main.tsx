import styled from 'styled-components';
import Splashzone from '../../public/Splashzone.png';
import ClubCard from '../../components/ClubCard';
import CommunityPost from '../components/CommunityPost';
import { motion } from 'framer-motion';
import ContentsCard from '../components/common/ContentsCard';

const Main = () => {
    return (
        <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledMain>
                <StyledContent>물위에서의 재미와 도전 그리고 열정을 공유하는</StyledContent>
                <StyledImg src={Splashzone}></StyledImg>
            </StyledMain>
            <StyledClub>
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
                <ContentsCard />
            </StyledClub>
        </motion.div>
    );
};

export default Main;

const StyledMain = styled.div`
    background-image: url('../../public/image 2.png');
    background-size: cover;
    box-shadow: 5px 2px 2px 2px;
    display: grid;
    height: 100vh;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    font-family: 'Anybody';
    font-size: 70px;
    color: white;
    min-width: 443px;
    min-height: 650px;
    text-shadow: 1px 1px 1px #000;
    @media (max-width: 1024px) {
        font-size: 40px;
    }
`;

const StyledContent = styled.div`
    grid-column: 3 / 8;
    margin-top: 250px;
`;

const StyledImg = styled.img`
    margin-top: 250px;
`;

const StyledClub = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

// const CardSection = styled.div`
//     grid-column: 2 / 3;
//     width: 100%;
//     display: grid;
//     grid-template-columns: repeat(3, 420px);
//     grid-auto-rows: 330px;
//     justify-content: center;
//     flex-grow: 1;
//     width: 100%;
//     height: 50%;
//     @media (max-width: 1024px) {
//         grid-template-columns: repeat(2, 1fr);
//         grid-column: 1 / 3;
//         justify-content: start;
//     }

//     @media (max-width: 768px) {
//         grid-template-columns: repeat(1, 1fr);
//         grid-column: 1 / 2;
//         justify-content: start;
//     }
// `;
