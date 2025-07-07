import CreateOrderOnBehalf from "@/components/create-order-on-behalf";

export default function CreateOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Order</h1>
        <p className="text-gray-600">Create orders on behalf of members who are physically present</p>
      </div>
      
      <CreateOrderOnBehalf />
    </div>
  );
}