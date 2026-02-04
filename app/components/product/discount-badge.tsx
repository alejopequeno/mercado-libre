export const DiscountBadge = ({ discount }: { discount: number }) => {
  return (
    <span className="text-xs font-semibold bg-green-100 text-green-800 py-1 px-2 rounded-md">
      {discount}% OFF
    </span>
  );
};
