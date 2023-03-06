import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";

import CreateRequest from "../Pages/CreateRequest";

import Layout from "../Pages/Layuot/Layout";
import Main from "../Pages/Main/Main";
import EmptyPege from '../Pages/EmptyPege';

import AggregateRequestUnit from "../Pages/CreateRequest/DetaliPages/AggregateRequestUnit";
import AggregateRequestSpare from "../Pages/CreateRequest/DetaliPages/AggregateRequestSpare";
import AggregateRequestRespair from "../Pages/CreateRequest/DetaliPages/AggregateRequestRespair";
import AggregateRequestTruck from "../Pages/CreateRequest/DetaliPages/AggregateRequestTruck";
import RequestTransport from "../Pages/CreateRequest/DetaliPages/RequestTransport";

import CreateInParsing from "../Pages/CreateInParsing";
  import AddAutoParsing from "../Pages/CreateInParsing/DetaliPages/AddAutoParsing"; //from "../Pages/CreateInParsing/DetaliPages/AddAutoParsing";
  import CreateEditParserForm from "../Pages/CreateInParsing/DetaliPages/CreateEditParserForm";
  import CreateEditParserList from "../Pages/CreateInParsing/DetaliPages/CreateEditParserList";
  import CreateDeleteParserList from "../Pages/CreateInParsing/DetaliPages/CreateDeleteParserList";
  import CreateSearchParserList from "../Pages/CreateInParsing/DetaliPages/CreateSearchParserList";

import Info from "../Pages/Info";

import Docs from "../Pages/Docs";
import AddAutoDocs from "../Pages/Docs/DetaliPages/AddAutoDocs/AddAutoDocs";
import AutoDocsEditForm from "../Pages/Docs/DetaliPages/AutoDocsEditForm";
import AutoDocsEditList from "../Pages/Docs/DetaliPages/AutoDocsEditList";
import AutoDocsSearchList from "../Pages/Docs/DetaliPages/AutoDocsSearchList";
import AutoDocsDeleteList from "../Pages/Docs/DetaliPages/AutoDocsDeleteList";

import InfoContext from "../Pages/Info/DetaliPages/InfoContext";
import Rating from "../Pages/Rating";
import SeeReview from "../Pages/Rating/DetaliPages/SeeReview";
import CreateReview from "../Pages/Rating/DetaliPages/CreateReview";
import TopReview from "../Pages/Rating/DetaliPages/TopReview";

import OurWarrantly from "../Pages/Rating/DetaliPages/OurWarrantly";
import OurWarrantlyAdmin from "../Pages/Rating/DetaliPages/OurWarrantly/OurWarrantlyAdmin";
import OurWarrantlyMembers from "../Pages/Rating/DetaliPages/OurWarrantly/OurWarrantlyMembers";
import CreateInSales from "../Pages/CreateInSales";

import AddAutoSales from "../Pages/CreateInSales/DetaliPages/AddAutoSales";
import CreateEditSalesList from "../Pages/CreateInSales/DetaliPages/CreateEditSalesList";
import CreateEditSaleForm from "../Pages/CreateInSales/DetaliPages/CreateEditSaleForm";
import CreateDeleteSaleList from "../Pages/CreateInSales/DetaliPages/CreateDeleteSaleList";
import EmiratesPege from "../Pages/EmiratesPege";
import MyProfile from "../Pages/MyProfile";
import Payment from "../Pages/MyProfile/DetaliPage";
import Filters from "../Pages/Filters/Filters";
import FiltersSpare from "../Pages/Filters/DetaliPages/FiltersSpare";
import FiltersIfrem from "../Pages/FiltersIfrem";
  // import AddAutoDocs from "../Pages/CreateInParsing/DetaliPages/AddAutoDocs";
 


export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />

          <Route path="button_make_request" element={<CreateRequest />} />
            <Route path="/button_make_request/button_request_unit" element={<AggregateRequestUnit />} /> //Запрос на агрегат
            <Route path="/button_make_request/button_request_spare" element={<AggregateRequestSpare />} />
            <Route path="/button_make_request/button_request_respairs" element={<AggregateRequestRespair />} />
            <Route path="/button_make_request/button_request_transport" element={<RequestTransport />} />
            <Route path="/button_make_request/button_request_trucks" element={<AggregateRequestTruck />} />
          
          <Route path="button_parsing" element = { <CreateInParsing /> } /> //3
            <Route path="/button_parsing/button_create_parsing" element={<AddAutoParsing />} />
            <Route path="/button_parsing/button_search_parsing" element={<CreateSearchParserList />} />
            <Route path="/button_parsing/button_edit_parsing" element={<CreateEditParserList />} />
              <Route path="/button_parsing/button_edit_parsing_form" element={<CreateEditParserForm />} />
            <Route path="/button_parsing/button_delete_parsing" element={<CreateDeleteParserList />} />

          <Route path="button_info" element={<Info />} /> //5
            <Route path="/button_info/:id" element={<InfoContext />} />

          <Route path="button_rating" element={<Rating />} />
            <Route path="/button_rating/button_search_rating" element={<SeeReview />} />
            <Route path="/button_rating/button_create_rating" element={<CreateReview />} /> //Написать отзыв
            <Route path="/button_rating/button_top_rating" element={<TopReview />} /> //Топ-100 пользователей
            <Route path="/button_rating/button_garant_rating" element={<OurWarrantly />} /> //Наши гаранты
              <Route path="/button_rating/button_garant_admin" element={<OurWarrantlyAdmin />} /> //Наши гаранты админ
              <Route path="/button_rating/button_garant_members" element={<OurWarrantlyMembers />} /> //Наши гаранты участники

          <Route path="button_docs" element={<Docs />} />
            <Route path="/button_docs/button_create_doc" element={<AddAutoDocs />} />
            <Route path="/button_docs/button_edit_doc" element={<AutoDocsEditList />} />
            <Route path="/button_docs/button_edit_doc_form" element={<AutoDocsEditForm />} />
            <Route path="/button_docs/button_delete_doc" element={<AutoDocsDeleteList />} />
            <Route path="/button_docs/button_search_doc" element={<AutoDocsSearchList />} />

          <Route path="button_sales" element = { <CreateInSales /> } /> //3
            <Route path="/button_sales/button_create_sale" element={<AddAutoSales />} />
            <Route path="/button_sales/button_edit_sale" element={<CreateEditSalesList />} />
              <Route path="/button_sales/button_edit_sales_form" element={<CreateEditSaleForm />} />
            <Route path="/button_sales/button_delete_sale" element={<CreateDeleteSaleList />} />

            {/* <Route path="/button_sales/button_search_sale" element={<CreateInSales />} /> */}
            <Route path="/button_my_profile" element={<MyProfile />} />
              <Route path="/button_my_profile/payment" element={<Payment />} />


          <Route path="button_emirates" element={<EmiratesPege />} />

          <Route path="button_filters" element={<FiltersIfrem />} />
          {/* <Route path="button_filters" element={<Filters />} /> */}
            {/* <Route path="/button_filters/spare" element={<FiltersSpare />} />
            <Route path="/button_filters/spare/:id" element={<EmptyPege />} /> */}
          
          <Route path="*" element={<EmptyPege />} />
      </Route>
    )
);