import { useState } from "react";
import logo from "../src/assets/logo.jpeg";
import {
  Bell,
  User,
  Moon,
  Sun,
  ClipboardCheck,
  Package,
  Wallet,
  BadgeCheck,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";

// import logo from "../assets/logo.png";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode
    ? {
        bg: "#1F1712",
        surface: "#36261D",
        surface2: "#2B2019",
        border: "#5A4334",
        text: "#F3E7D3",
        subText: "#D5C2AA",
        primary: "#A76436",
        accent: "#D38A45",
      }
    : {
        bg: "#F5EFE3",
        surface: "#FFF8EE",
        surface2: "#ECE1CF",
        border: "#D6C3A5",
        text: "#3B2418",
        subText: "#6B5846",
        primary: "#8A4B2A",
        accent: "#C99A52",
      };

  const stats = [
    {
      title: "Today's Tasks",
      value: "04",
      icon: <ClipboardCheck size={24} />,
    },
    {
      title: "Assigned Orders",
      value: "02",
      icon: <Package size={24} />,
    },
    {
      title: "Pending Payment",
      value: "₹3,250",
      icon: <Wallet size={24} />,
    },
    {
      title: "Completed Today",
      value: "01",
      icon: <BadgeCheck size={24} />,
    },
  ];

  return (
    <div
      className="min-h-screen transition-all duration-500 pb-24"
      style={{
  background: darkMode
    ? theme.bg
    : `
      repeating-linear-gradient(
        0deg,
        ${theme.bg},
        ${theme.bg} 18px,
        rgba(139,94,60,0.06) 19px,
        ${theme.bg} 20px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 18px,
        rgba(139,94,60,0.06) 19px,
        transparent 20px
      )
    `,
  color: theme.text,
  fontFamily: "Quicksand",
}}
    >

            {/* ================= NAVBAR ================= */}

      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: theme.surface,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

          <div className="flex items-center gap-2">

            <img
  src={logo}
  alt="KarghaKendra"
  className="w-12 h-12 rounded-full object-cover"
/>

            <div>

              <h1
                className="text-lg font-semibold"
                style={{
                  fontFamily: "Amita",
                  color: theme.primary,
                }}
              >
                KarghaKendra
              </h1>

              <p
                className="text-sm"
                style={{
                  color: theme.subText,
                }}
              >
                Handloom & Heritage
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
  onClick={() => setDarkMode(!darkMode)}
  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
  style={{
    background: theme.surface2,
    border: `1px solid ${theme.border}`,
  }}
>
  {darkMode ? (
    <Sun size={20} style={{ color: theme.accent }} />
  ) : (
    <Moon size={20} style={{ color: theme.primary }} />
  )}
</button>

            <button
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
  style={{
    background: theme.surface2,
    border: `1px solid ${theme.border}`,
  }}
>
              <Bell
                size={20}
                style={{ color: theme.primary }}
              />
            </button>

            <button
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
  style={{
    background: theme.surface2,
    border: `1px solid ${theme.border}`,
  }}
>
              <User
                size={20}
                style={{ color: theme.primary }}
              />
            </button>

          </div>

        </div>

      </nav>

            {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-4 mt-6">

  <div
    className="rounded-3xl px-5 py-4"
    style={{
      background: theme.surface,
      border: `2px dashed ${theme.border}`,
    }}
  >

    <p
      className="text-xs font-medium uppercase tracking-wide"
      style={{ color: theme.subText }}
    >
      Welcome Back
    </p>

    <h2
      className="text-3xl font-bold mt-1 leading-tight"
      style={{ color: theme.text }}
    >
      Namaste, Ramesh 
    </h2>

    <p
      className="mt-2 text-base leading-snug"
      style={{
        color: theme.subText,
        fontFamily: "Amita",
      }}
    >
      "Every thread weaves India's heritage."
    </p>

  </div>

</section>

            {/* ================= STATS ================= */}

      <section className="max-w-7xl mx-auto px-4 mt-8">

        <div className="grid grid-cols-2 gap-5 max-w-3xl">

          {stats.map((item) => (

            <div
              key={item.title}
              className="rounded-3xl p-6 min-h-[180px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: theme.surface,
                border: `2px dashed ${theme.border}`,
              }}
            >

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: theme.surface2,
                  color: theme.primary,
                }}
              >
                {item.icon}
              </div>

              <p
                className="mt-5"
                style={{ color: theme.subText }}
              >
                {item.title}
              </p>

              <h2
                className="text-4xl font-bold mt-2"
                style={{ color: theme.text }}
              >
                {item.value}
              </h2>

            </div>

          ))}

        </div>

      </section>


            {/* ================= PRODUCTION ================= */}

      <section className="max-w-7xl mx-auto px-4 mt-10">

        <div
          className="rounded-3xl p-7"
          style={{
            background: theme.surface,
            border: `2px dashed ${theme.border}`,
          }}
        >

          <div className="grid grid-cols-2 gap-6 items-center">

            <div>

              <h2
                className="text-2xl font-bold"
                style={{ color: theme.text }}
              >
                Production Journey
              </h2>

              <p
                className="mt-1"
                style={{ color: theme.subText }}
              >
                Order #2487 • Cotton Handloom Saree
              </p>

            </div>

            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: theme.surface2,
                color: theme.primary,
              }}
            >
              72% Complete
            </span>

          </div>

          <div className="mt-8">

            <div className="mt-8 flex items-center justify-between">

  {/* Warping */}
  <div className="flex flex-col items-center">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
      style={{
        background: "#3CB371",
        color: "#fff",
      }}
    >
      ✓
    </div>

    <p className="mt-2 text-xs">Warping</p>
  </div>

  <div
    className="flex-1 h-1 mx-2 rounded-full"
    style={{ background: "#3CB371" }}
  />

  {/* Dyeing */}
  <div className="flex flex-col items-center">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
      style={{
        background: "#3CB371",
        color: "#fff",
      }}
    >
      ✓
    </div>

    <p className="mt-2 text-xs">Dyeing</p>
  </div>

  <div
    className="flex-1 h-1 mx-2 rounded-full"
    style={{ background: "#3CB371" }}
  />

  {/* Weaving */}
  <div className="flex flex-col items-center">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
      style={{
        background: theme.primary,
        color: "#fff",
      }}
    >
      3
    </div>

    <p className="mt-2 text-xs">Weaving</p>
  </div>

  <div
    className="flex-1 h-1 mx-2 rounded-full"
    style={{ background: theme.surface2 }}
  />

  {/* Finishing */}
  <div className="flex flex-col items-center">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
      style={{
        background: theme.surface2,
        color: theme.subText,
      }}
    >
      4
    </div>

    <p className="mt-2 text-xs">Finishing</p>
  </div>

</div>
</div>
        </div>

      </section>





      {/* ================= QUICK ACTIONS ================= */}

      <section className="max-w-7xl mx-auto px-4 mt-10">

        <h2
          className="text-2xl font-bold mb-5"
          style={{ color: theme.text }}
        >
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {[
            "Accept Work",
            "Update Progress",
            "Upload Images",
            "Report Issue",
          ].map((action) => (

            <button
              key={action}
              className="rounded-3xl p-6 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                background: theme.primary,
                color: "#ffffff",
              }}
            >
              {action}
            </button>

          ))}

        </div>

      </section>





      {/* ================= PAYMENTS ================= */}

      <section className="max-w-7xl mx-auto px-4 mt-10">

        <div className="grid md:grid-cols-3 gap-6">

          <div
            className="rounded-3xl p-6"
            style={{
              background: theme.surface,
              border: `2px dashed ${theme.border}`,
            }}
          >

            <p style={{ color: theme.subText }}>
              Pending Payment
            </p>

            <h2
              className="text-4xl font-bold mt-2"
              style={{ color: theme.primary }}
            >
              ₹3,250
            </h2>

          </div>

          <div
            className="rounded-3xl p-6"
            style={{
              background: theme.surface,
              border: `2px dashed ${theme.border}`,
            }}
          >

            <p style={{ color: theme.subText }}>
              Total Received
            </p>

            <h2
              className="text-4xl font-bold mt-2"
              style={{ color: theme.primary }}
            >
              ₹18,750
            </h2>

          </div>

          <div
            className="rounded-3xl p-6"
            style={{
              background: theme.surface,
              border: `2px dashed ${theme.border}`,
            }}
          >

            <p style={{ color: theme.subText }}>
              Incentives
            </p>

            <h2
              className="text-4xl font-bold mt-2"
              style={{ color: theme.primary }}
            >
              ₹800
            </h2>

          </div>

        </div>

      </section>


          



      {/* ================= BOTTOM NAVIGATION ================= */}
<div
  className="fixed bottom-0 left-0 right-0 backdrop-blur-xl"
  style={{
    background: theme.surface,
    borderTop: `1px solid ${theme.border}`,
  }}
>
  <div className="max-w-4xl mx-auto flex justify-around items-center py-2">

    {/* Dashboard */}
    <button
      className="flex flex-col items-center gap-2 transition hover:scale-110"
      style={{ color: theme.primary }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: theme.surface2,
        }}
      >
        <LayoutDashboard size={20} />
      </div>

      <span className="text-sm font-medium">
        Dashboard
      </span>
    </button>

    {/* Orders */}
    <button
      className="flex flex-col items-center gap-2 transition hover:scale-110"
      style={{ color: theme.subText }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <Package size={20} />
      </div>

      <span className="text-sm font-medium">
        Orders
      </span>
    </button>

    {/* Tasks */}
    <button
      className="flex flex-col items-center gap-2 transition hover:scale-110"
      style={{ color: theme.subText }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <ClipboardCheck size={20} />
      </div>

      <span className="text-sm font-medium">
        Tasks
      </span>
    </button>

    {/* Chat */}
    <button
      className="flex flex-col items-center gap-2 transition hover:scale-110"
      style={{ color: theme.subText }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <MessageCircle size={20} />
      </div>

      <span className="text-sm font-medium">
        Chat
      </span>
    </button>

    {/* Profile */}
    <button
      className="flex flex-col items-center gap-2 transition hover:scale-110"
      style={{ color: theme.subText }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <User size={20} />
      </div>

      <span className="text-sm font-medium">
        Profile
      </span>
    </button>

  </div>
</div>
</div>
  );
}
