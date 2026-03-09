import { mockAccounts } from "@/lib/mockData";
import { TbWallet, TbBuildingBank, TbCreditCard, TbCash } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const typeIcon: Record<string, JSX.Element> = {
  cash: <TbCash size={22} />,
  bank: <TbBuildingBank size={22} />,
  ewallet: <RiMoneyDollarCircleLine size={22} />,
  credit: <TbCreditCard size={22} />,
};

const typeColor: Record<string, string> = {
  cash: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
  bank: "bg-blue-50 dark:bg-blue-500/10 text-blue-500",
  ewallet: "bg-sky-50 dark:bg-sky-500/10 text-sky-500",
  credit: "bg-purple-50 dark:bg-purple-500/10 text-purple-500",
};

const typeLabel: Record<string, string> = {
  cash: "Cash",
  bank: "Bank Account",
  ewallet: "E-Wallet",
  credit: "Credit Card",
};

export default function AccountPage() {
  const totalBalance = mockAccounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Accounts
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of your accounts
        </p>
      </div>

      {/* Total Balance Card */}
      <div className="bg-blue-500 rounded-2xl p-6 mb-6 text-white">
        <p className="text-sm font-medium opacity-80 mb-1">Total Balance</p>
        <p className="text-4xl font-bold">₱{totalBalance.toLocaleString()}</p>
        <p className="text-sm opacity-70 mt-2">
          {mockAccounts.length} accounts connected
        </p>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAccounts.map((account) => (
          <div
            key={account.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${typeColor[account.type]}`}
              >
                {typeIcon[account.type]}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {account.name}
                </p>
                <p className="text-xs text-slate-400">
                  {typeLabel[account.type]}
                </p>
              </div>
            </div>
            <p
              className={`text-base font-bold ${account.balance < 0 ? "text-red-400" : "text-slate-900 dark:text-slate-50"}`}
            >
              {account.balance < 0 ? "-" : ""}₱
              {Math.abs(account.balance).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
