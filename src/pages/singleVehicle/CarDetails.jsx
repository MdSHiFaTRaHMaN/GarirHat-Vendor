import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import CarOverview from "./CarOverview";
import Features from "./Features";
import Specifications from "./Specifications";
import Loading from "../../components/Loading";
import { useSingleVehicle } from "../../api/vehicleApi";
import { useParams } from "react-router-dom";
import { Image, Button, Select, Badge } from "antd";
const CarDetails = () => {
  const { vehicleID } = useParams();
  const { singleVehicle, isLoading, isError, error, refetch } =
    useSingleVehicle(vehicleID);

  const vehicle = singleVehicle.data;
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (vehicle) {
      setStatus(vehicle.status);
    }
  }, [vehicle]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const handleStatusChange = async (value) => {
    console.log("value", value);
    // try {
    //   const response = await API.put(`/orders/status/${orderID}`, {
    //     status: value,
    //   });

    //   if (response.statusText == "OK") {
    //     setStatus(value); // Update status locally
    //     message.success("Order status updated successfully");
    //     refetch(); // Refresh order details after update
    //   } else {
    //     message.error("Failed to update order status");
    //   }
    // } catch (error) {
    //   message.error(`Error updating status ${error.message}`);
    // }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        {error.message || "Something went wrong"}
      </div>
    );

  console.log(status, "this", vehicle);

  return (
    <div className="max-w-6xl mx-auto">
      <div className=" p-4 grid md:grid-cols-2 gap-6">
        {/* Image Carousel */}
        <Carousel responsive={responsive} className="h-[370px]">
          {vehicle.images.map((img, index) => (
            <Image
              width="100%"
              height="370px"
              className="rounded-lg"
              key={index}
              src={img}
              alt="vehicle_images"
            />
          ))}
        </Carousel>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold">
            {vehicle.year_of_manufacture} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-green-600 text-2xl font-semibold">
            ৳{vehicle.price}
          </p>
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Vehicle Code:</strong> {vehicle.vehicle_code}
            </p>
            <p>
              <strong>Location:</strong> {vehicle.city && `${vehicle.city},`}
              {vehicle.district}, {vehicle.division}
            </p>
            <p>
              <strong>Discount Price:</strong> ৳{vehicle.discount_price}
            </p>
            <p>
              <strong>Advertised On: </strong>
              {new Date(vehicle.created_at).toLocaleString()}
            </p>
            <div>
              <strong>Status: </strong>
              {vehicle.status === "Active" || vehicle.status === "Upcoming" ? (
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  style={{ width: 120 }}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Upcomming", label: "Upcomming" },
                  ]}
                />
              ) : (
                <Select
                  value={vehicle.status}
                  style={{ width: 120 }}
                  disabled
                />
              )}
            </div>
            <div className="pt-1">
              <Badge count={5}>
                <Button>Message for this Vehicle</Button>
              </Badge>
            </div>

            <div className="pt-1">
              <Badge count={3}>
                <Button>Report for this Vehicle</Button>
              </Badge>
            </div>
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <CarOverview vehicle={vehicle} />
        <Features features={vehicle?.features} />
        <Specifications vehicle={vehicle} />
      </div>
    </div>
  );
};

export default CarDetails;
