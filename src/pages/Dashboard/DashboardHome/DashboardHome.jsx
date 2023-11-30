import useRole from "../../../hooks/useRole";
import SaleSummary from "../Admin/SaleSummary";
import SalesSummary from "../ShopManager/SalesSummary";

const DashboardHome = () => {
   const { role } = useRole()
   return (
      <>
         <div>
            {role === 'admin' && <SaleSummary />}
            {role === 'manager' && <SalesSummary />}
         </div>
      </>
   );
};

export default DashboardHome;