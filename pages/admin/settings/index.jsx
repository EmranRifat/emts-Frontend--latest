import { useState } from "react";
import SettingsSidebar from "../../../components/admin/settings/SettingsSidebar";
import TermsAndCondition from "../../../components/admin/settings/TermsAndCondition";
import Security from "../../../components/admin/settings/Security";
import Faq from "../../../components/admin/settings/Faq";
import Payment from "../../../components/admin/settings/Payment";
import ProgramAndResources from "../../../components/admin/settings/ProgramAndResources";
import Notification from "../../../components/admin/settings/Notification";
import PersonalInfo from "../../../components/admin/settings/PersonalInfo";
import Layout from "components/layout";
import AdminLayout from "components/admin/layout";

function Settings() {
  const [activeTab, setActiveTab] = useState("personalInfo");
  
  return (
    <>
      {/* Sidebar  */}
      {/* <SettingsSidebar activeTab={activeTab} handleActiveTab={setActiveTab} /> */}
      {/* Tab Content  */}
      <div className="py-8 px-10 col-span-9 tab-content">
        {/* Personal Information */}
        <PersonalInfo name="personalInfo" activeTab={activeTab} />
        {/* Notification  */}
        <Notification name="notification" activeTab={activeTab} />
        {/* Program & Resources  */}
        {/* <ProgramAndResources name="programAndResources" activeTab={activeTab} /> */}
        {/* Payments  */}
        <Payment name="payment" activeTab={activeTab} />
        {/* Faq  */}
        {/* <Faq name="faq" activeTab={activeTab} /> */}
        {/* Security Password  */}
        <Security name="security" activeTab={activeTab} />
        {/* Terms & Condition  */}
        {/* <TermsAndCondition name="termsAndConditions" activeTab={activeTab} /> */}
      </div>
    </>
  );



 
}
Settings.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  )
}

export default Settings;
