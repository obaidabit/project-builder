import React from "react";

export default function Video(props) {
  return (
    <video
      className="video"
      draggable="true"
      data-name="video"
      data-edit={true}
      autoPlay="true"
      {...props}
    >
      <source
        src="https://stream.mux.com/5D8KLE02E7ghzttOvoRNkPYpNvFctoWK5/high.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InQ5UHZucm9ZY0hQNjhYSmlRQnRHTEVVSkVSSXJ0UXhKIn0.eyJleHAiOjE2MzAxMTg3ODIsImF1ZCI6InYiLCJzdWIiOiI1RDhLTEUwMkU3Z2h6dHRPdm9STmtQWXBOdkZjdG9XSzUifQ.IRXfcGe1AWJnweV0yDTn9zpzVvHMBWDMY1v4aWkn5yVIk-1ZKF_TRopuAcgBrc1EXU6A1meIP8VGnbTgmeMKM8Sl8izOG9miRIEOrnPpRb_laNcLmn8pXkliPt1bl583APn7qykWOxmT6_yCrc-eMkEa97dEj9jEsqIMo3WyFS7eqLa_D9OK9BEvZIo6naZLVf7FJUB1jxoYozKiwPbBhIuznnZCcYk4FPy6UOsflAyjreXiyDBvZNw7S6GRXVJuqLQh3ZJRKPR3qg6otDI-OXneZ7J2NlfR03TpQ4WY9qmSZyxEaT-0rSsvR8JDHA1k2LD5ad8dzR1gaFd7Yu83CA"
        type="video/mp4"
      />
    </video>
  );
}
