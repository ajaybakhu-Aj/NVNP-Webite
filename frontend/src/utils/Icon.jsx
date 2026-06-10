import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Icon({
  name,
  size = 24,
  fill = false,
  style = {},
  className = "",
}) {
  const socialIcons = {
    instagram: FaInstagram,
    facebook: FaFacebookF,
    tiktok: FaTiktok,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
    x: FaXTwitter,
    twitter: FaXTwitter,
  };

  const SocialIcon = socialIcons[name?.toLowerCase()];

  if (SocialIcon) {
    return (
      <SocialIcon
        size={size}
        style={style}
        className={className}
      />
    );
  }

  return (
    <span
      className={`material-symbols-outlined${
        fill ? " fill-icon" : ""
      }${className ? " " + className : ""}`}
      style={{
        fontSize: size,
        ...style,
      }}
    >
      {name}
    </span>
  );
}