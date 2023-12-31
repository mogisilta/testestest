import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';

export default function ScrollBanner({ bannerImg }: { bannerImg: string }) {
    const rollBannerRef = useRef<HTMLDivElement | null>(null);
    const [isRollBannerInViewPort, setIsRollBannerInViewPort] = useState<boolean>(true);

    useEffect(() => {
        const onScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= 0) {
                setIsRollBannerInViewPort(true);
            }
        };
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        const rollBannerRefValue = rollBannerRef.current;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // console.log('RollBanner is now in viewport');
                    setIsRollBannerInViewPort(true);
                } else {
                    // console.log('RollBanner is now out of viewport');
                    setIsRollBannerInViewPort(false);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.0,
        });

        if (rollBannerRefValue) {
            observer.observe(rollBannerRefValue);
        }

        return () => {
            if (rollBannerRefValue) {
                observer.unobserve(rollBannerRefValue);
            }
        };
    }, []);

    return (
        <Link
            activeClass="active"
            to="ContentContainer"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            className="data-scroll"
        >
            <RollBanner ref={rollBannerRef} $inView={isRollBannerInViewPort}>
                <SwiperContainer>
                    <SwiperWarp>
                        <img src={bannerImg} />
                    </SwiperWarp>
                    {/* <SwiperPageTab>
                        <ArrowLeft />
                        <ArrowRight />
                    </SwiperPageTab> */}
                </SwiperContainer>
            </RollBanner>
        </Link>
    );
}

const RollBanner = styled.div<{ $inView: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #4f4d4d;
    position: relative;
    opacity: ${({ $inView }) => ($inView ? '1' : '0')};
    visibility: ${({ $inView }) => ($inView ? 'visible' : 'hidden')};
    transition: opacity 1s ease, visibility 1s ease;
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const SwiperWarp = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    height: 100%;

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// const SwiperPageTab = styled.div`
//     display: flex;
//     position: absolute;
//     width: 100%;
//     top: 0;
//     bottom: 0;
//     align-items: center;
//     justify-content: space-between;
// `;

// const Arrow = styled.span`
//     color: white;
//     font-size: 2em;
//     cursor: pointer;
// `;

// const ArrowLeft = styled(Arrow)`
//     &:before {
//         content: '◀';
//     }
// `;

// const ArrowRight = styled(Arrow)`
//     &:after {
//         content: '▶';
//     }
// `;
