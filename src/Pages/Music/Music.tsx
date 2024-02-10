import {
  Button,
  Col,
  Drawer,
  GetProps,
  Input,
  List,
  Row,
  Skeleton,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Config/store";
import { IMusic, getMusicList } from "./Music.reducer";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { DollarSvg } from "../../icons/DollarSvg";
import Icon, { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import NgMusic from "../../images/ngmusic.png";
import "./Music.css";

type CustomIconComponentProps = GetProps<typeof Icon>;
const fakeDataUrl = `https://randomuser.me/api/?results=${3}&inc=name,gender,email,nat,picture&noinfo`;

const Music: React.FC = () => {
  const { data, isLoadingMusic } = useSelector(
    (state: RootState) => state.music
  );
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setVisible] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [countLimit, setCountLimit] = useState(5);
  const [dataList, setDataList] = useState<IMusic[]>([]);

  useEffect(() => {
    dispatch(getMusicList({ search: search, limit: countLimit }));
  }, [countLimit, search]);

  const DollarIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={DollarSvg} {...props} />
  );

  const handleSearch = (val?: string) => {
    navigate(`/music/${val}`);
    setVisible(false);
    setCountLimit(5);
  };

  const onLoadMore = () => {
    setCountLimit(countLimit + 5);
  };

  const loadMore = !isLoadingMusic ? (
    <div className="btn-load">
      <Button onClick={onLoadMore}>Load More</Button>
    </div>
  ) : null;

  useEffect(() => {
    if (data.results.length > 0) {
      setDataList(data.results);
    }
  }, [data]);

  return (
    <div>
      <Drawer
        className="search-drawer"
        visible={isVisible}
        onClose={() => setVisible(false)}
        width="100VW"
      >
        <div className="drawer-content">
          <Input
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Artist / Album / Title"
          />
          <Button onClick={() => handleSearch(searchItem)} type="primary">
            Search
          </Button>
        </div>
      </Drawer>
      <Row className="result-header" justify="space-between">
        <MenuOutlined
          style={{ color: "#ffffff", fontSize: "1rem", marginLeft: "1.25rem" }}
        />
        <img
          src={NgMusic}
          style={{ height: "1rem", width: "4.5rem", margin: "auto 0" }}
          alt="ngmusic"
        />
        <SearchOutlined
          onClick={() => setVisible(true)}
          style={{ color: "#ffffff", fontSize: "1rem", marginRight: "1.25rem" }}
        />
      </Row>
      <Row justify="center" style={{ height: "2rem", margin: "2.625rem 0" }}>
        <span className="search-result">
          <p>Search result for :</p>
          <p className="text-result">{search}</p>
        </span>
      </Row>
      <List
        className="loadmore-list"
        loading={isLoadingMusic}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={dataList}
        renderItem={(item: IMusic) => {
          return (
            <List.Item>
              <Skeleton
                avatar
                title={false}
                loading={item === undefined}
                active
              >
                <List.Item.Meta
                  avatar={
                    <ReactPlayer
                      playing={true}
                      controls
                      height={100}
                      key={item.trackId}
                      light={
                        <img
                          src={item.artworkUrl100}
                          alt="artwork"
                          style={{ borderRadius: "0.625rem" }}
                        />
                      }
                      url={item.previewUrl}
                      style={{ borderRadius: "0.625rem" }}
                      width={100}
                    />
                  }
                  title={item.artistName}
                  description={
                    <Col className="list-wrapper">
                      <Row>{item.trackName}</Row>
                      <Row
                        justify="space-between"
                        style={{ marginTop: "auto" }}
                      >
                        <Tag
                          color="#10b981"
                          style={{ borderRadius: "0.625rem" }}
                        >
                          {item.primaryGenreName}
                        </Tag>
                        <span className="text-price">
                          <DollarIcon /> {item.trackPrice}
                        </span>
                      </Row>
                    </Col>
                  }
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Music;
