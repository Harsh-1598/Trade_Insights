import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabButtonClass = (tab) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button className={tabButtonClass("profile")} onClick={() => setActiveTab("profile")}>
          👤 Profile Settings
        </button>
        <button className={tabButtonClass("account")} onClick={() => setActiveTab("account")}>
          🔐 Account Settings
        </button>
        <button className={tabButtonClass("notifications")} onClick={() => setActiveTab("notifications")}>
          🔔 Notification Settings
        </button>
        <button className={tabButtonClass("billing")} onClick={() => setActiveTab("billing")}>
          💳 Subscription / Billing
        </button>
        <button className={tabButtonClass("danger")} onClick={() => setActiveTab("danger")}>
          ⚠️ Danger Zone
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {activeTab === "profile" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <Input label="Full Name" placeholder="John Doe" />
              <Input label="Email" placeholder="john@example.com" type="email" />
              <Input label="Phone" placeholder="+1234567890" type="tel" />
              <SaveButton />
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <Input label="Change Password" placeholder="New Password" type="password" />
              <Checkbox label="Enable Two-Factor Authentication" />
              <Input label="Link Bank Account" placeholder="Bank Account #" />
              <SaveButton />
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-3">
              <Checkbox label="Email Alerts" defaultChecked />
              <Checkbox label="SMS Alerts" />
              <Checkbox label="Push Notifications" />
              <SaveButton />
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscription / Billing</h3>
            <p className="mb-4 text-gray-400">
              Current Plan: <strong className="text-white">Free</strong>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Upgrade Plan</label>
                <select className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-md p-2">
                  <option>Free</option>
                  <option>Pro - ₹199/mo</option>
                  <option>Enterprise - ₹299/mo</option>
                </select>
              </div>
              <Input label="Payment Method" placeholder="Card Ending in 1234" />
              <SaveButton text="Update Billing" />
            </div>
          </div>
        )}

        {activeTab === "danger" && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h3>
            <p className="text-gray-400 mb-4">
              These actions are irreversible. Please proceed with caution.
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Deactivate Account
              </button>
              <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Components */
const Input = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-300">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-900 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

const Checkbox = ({ label, defaultChecked = false }) => (
  <label className="flex items-center space-x-2 text-gray-300">
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      className="w-4 h-4 accent-blue-600"
    />
    <span>{label}</span>
  </label>
);

const SaveButton = ({ text = "Save Changes" }) => (
  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
    {text}
  </button>
);
