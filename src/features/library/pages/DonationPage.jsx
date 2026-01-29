import DonationForm from "../components/DonationForm";

export default function DonationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <DonationForm />
      </div>
    </div>
  );
}
