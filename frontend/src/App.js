import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const services = [
  {
    title: "Trip planning",
    text: "Custom routes, stays, transfers, and travel notes arranged before you fly.",
    icon: "01",
  },
  {
    title: "Hotel booking",
    text: "Handpicked hotels with flexible dates, breakfast options, and local support.",
    icon: "02",
  },
  {
    title: "Guided tours",
    text: "Private day plans, cultural walks, food trails, and safe adventure add-ons.",
    icon: "03",
  },
];

const deals = [
  {
    city: "Madrid",
    country: "Spain",
    price: "$520",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    price: "$610",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "Pokhara",
    country: "Nepal",
    price: "$430",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=82",
  },
  {
    city: "London",
    country: "England",
    price: "$780",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=82",
  },
];

const plans = [
  {
    title: "Aurora Valley",
    days: "5 days",
    price: "$760",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Lakeside Escape",
    days: "4 days",
    price: "$590",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=82",
  },
  {
    title: "Capital Lights",
    days: "6 days",
    price: "$840",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=82",
  },
];

const blogs = [
  {
    title: "How to plan a calm first Europe trip",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=82",
  },
  {
    title: "Beach towns that feel better off-season",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=82",
  },
  {
    title: "Packing light for a ten day holiday",
    image: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800&q=82",
  },
  {
    title: "Food markets worth building a day around",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=82",
  },
];

const LandingPage = () => {
  return (
    <main className="travel-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Travelo home">
          <span className="brand-mark">T</span>
          Travelo
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#deals">Deals</a>
          <a href="#plans">Plans</a>
          <a href="#blog">Blog</a>
          <a href="/login">Login</a>
        </nav>
        <a className="header-action" href="/register">
          Get started
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Best destinations around the world</p>
          <h1>
            Travel, enjoy and live a new <span>adventure</span>.
          </h1>
          <p>
            Discover carefully planned trips, trusted stays, and unforgettable local experiences in one simple place.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#deals">
              Explore deals
            </a>
            <a className="ghost-button" href="/login">
              Sign in
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1200&q=86"
            alt=""
          />
          <div className="hero-badge">
            <strong>27k+</strong>
            <span>Happy travelers</span>
          </div>
        </div>
      </section>

      <section className="booking-panel" aria-label="Trip search">
        <label>
          Location
          <strong>Where to?</strong>
        </label>
        <label>
          Date
          <strong>Choose month</strong>
        </label>
        <label>
          Guests
          <strong>2 travelers</strong>
        </label>
        <button type="button">Find now</button>
      </section>

      <section className="section muted" id="services">
        <div className="section-heading">
          <h2>
            Things you need <span>to do</span>
          </h2>
          <p>We make each step simple, from planning to the last ride back home.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="deals">
        <div className="section-heading">
          <h2>
            Exclusive <span>deals & discounts</span>
          </h2>
          <p>Fresh city breaks with carefully selected stays and local experiences.</p>
        </div>
        <div className="deal-grid">
          {deals.map((deal) => (
            <article className="deal-card" key={deal.city}>
              <img src={deal.image} alt={`${deal.city}, ${deal.country}`} />
              <div>
                <h3>{deal.city}</h3>
                <p>{deal.country}</p>
              </div>
              <strong>{deal.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="plans">
        <div className="section-heading">
          <h2>
            Best <span>vacation plan</span>
          </h2>
          <p>Balanced itineraries with scenic stays, direct support, and room to breathe.</p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className="plan-card" key={plan.title}>
              <img src={plan.image} alt={plan.title} />
              <div>
                <h3>{plan.title}</h3>
                <span>{plan.days}</span>
              </div>
              <strong>{plan.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted story-section">
        <div className="story-copy">
          <h2>
            What people say <span>about us</span>
          </h2>
          <p>Thousands of travelers trust our team for clear plans, kind support, and smooth holidays.</p>
        </div>
        <article className="testimonial">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=82"
            alt="Happy traveler"
          />
          <p>
            "Everything felt effortless. The hotel, transfers, and daily activities were planned beautifully."
          </p>
          <strong>Mike Taylor</strong>
          <span>Lahore, Pakistan</span>
        </article>
      </section>

      <section className="section" id="blog">
        <div className="section-heading">
          <h2>
            Get update with <span>latest blog</span>
          </h2>
        </div>
        <div className="blog-grid">
          {blogs.map((post) => (
            <article className="blog-card" key={post.title}>
              <img src={post.image} alt={post.title} />
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="subscribe" id="subscribe">
        <h2>Subscribe and get exclusive deals & offer</h2>
        <form>
          <input type="email" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="site-footer">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">T</span>
            Travelo
          </a>
          <p>Book memorable trips with thoughtful planning and friendly travel support.</p>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#services">About</a>
          <a href="#deals">Deals</a>
          <a href="#blog">Blog</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@travelo.test">hello@travelo.test</a>
          <a href="tel:+10000000000">+1 000 000 0000</a>
        </div>
      </footer>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
