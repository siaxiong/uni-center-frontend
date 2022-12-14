import React from "react";
import DefaultLayout_Style from "./DefaultLayout.module.css";
import PropTypes from "prop-types";


type DefaultLayoutProps = {
	children: React.ReactNode;
  };
export const DefaultLayout = function({children}: DefaultLayoutProps){
	const style = DefaultLayout_Style;
	return <div className={style.DefaultLayout}>
		{children}
		<p className={style.footer}>© 2022 University Center</p>
	</div>;
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
};