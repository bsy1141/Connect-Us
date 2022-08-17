import { useEffect, useState } from "react";
import Header from "../Header";
import styled from "styled-components";
import SearchInputForm from "./SearchInputForm";
import * as Api from "api";
import LoadingSpinner from "components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [companyPosts, setCompanyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularPosts = async () => {
    const getUserPopularPosts = Api.get("posts/popular/user?count=10");
    const getCompanyPopularPosts = Api.get("posts/popular/company?count=10");

    try {
      setLoading(true);

      const [userPopularPosts, companyPopularPosts] = await Promise.all([
        getUserPopularPosts,
        getCompanyPopularPosts,
      ]);

      setUserPosts(userPopularPosts.data);
      setCompanyPosts(companyPopularPosts.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopularPosts();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <SearchInputForm />
        <PopularPostsContainer>
          <PopularContent>
            <Title>
              <p>구직자 인기글</p>
            </Title>
            {userPosts.map((post) => (
              <Card key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                <WriterInfo>
                  <WriterImage />
                  <p>{post.userName}</p>
                </WriterInfo>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <Infos>
                  <div>
                    <FontAwesomeIcon icon={faHeart} />
                    {` ${post?.likes?.length || 0}`}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faComment} />
                    {` ${post?.comments?.length || 0}`}
                  </div>
                </Infos>
              </Card>
            ))}
          </PopularContent>
          <PopularContent>
            <Title>
              <p>구인자 인기글</p>
            </Title>
            {companyPosts.map((post) => (
              <Card key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
                <WriterInfo>
                  <WriterImage />
                  <p>{post.userName}</p>
                </WriterInfo>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <Infos>
                  <div>
                    <FontAwesomeIcon icon={faHeart} />
                    {` ${post?.likes?.length || 0}`}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faComment} />
                    {` ${post?.comments?.length || 0}`}
                  </div>
                </Infos>
              </Card>
            ))}
          </PopularContent>
        </PopularPostsContainer>
      </Content>
    </Container>
  );
};

export default SearchPage;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px 3% 3% 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PopularPostsContainer = styled.div`
  height: 75%;
  display: flex;
  justify-content: space-evenly;
`;

const PopularContent = styled.div`
  border: 3px solid #ff758f;
  border-radius: 10px;
  width: 40%;
  padding: 0 2% 1%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  background: #fff;
  height: 60px;
  position: sticky;
  top: 0px;
  > p {
    padding: 15px 0;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Card = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 3%;
  cursor: pointer;
  > h3 {
    font-size: 20px;
  }
  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  margin-bottom: 3%;
  > p {
    align-self: center;
    margin: 0 0 0 2%;
  }
`;

const WriterImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #c4c4c4;
`;

const Infos = styled.div`
  text-align: right;
  > div {
    display: inline-block;
    margin-right: 10px;
    color: #7b7b7b;
  }
`;
