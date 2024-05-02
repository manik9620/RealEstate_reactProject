import { useEffect, useState } from "react";
import "../styles/List.css";
import Loader from "../component/Loader";
import Navbar from "../component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setBoughtList } from "../redux/state";
import ListingCard from "../component/ListingCard";
import Footer from "../component/Footer"

const BoughtList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const BoughtList = useSelector((state) => state.user.BoughtList);

  const dispatch = useDispatch();

  const getBoughtList = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}/bought`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setBoughtList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getBoughtList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Bought List</h1>
      <div className="list">
        {BoughtList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
          <ListingCard
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BoughtList;
