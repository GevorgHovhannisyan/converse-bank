import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFooterAboutThunk } from '../../redux/thunks/menus/menuThunk';
import './home-app-section.scss';
import LandingForm from "../landing/LandingForm";
import {getLandingInfoThunk} from "../../redux/thunks/landing";
import '../landing/landing.scss'
const HomeAppSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFooterAboutThunk());
      dispatch(getLandingInfoThunk('mobileapp'))
  }, [dispatch]);

  return (
      <div className="landing_page home_form">
          <LandingForm />
      </div>
  );
};

export default HomeAppSection;
