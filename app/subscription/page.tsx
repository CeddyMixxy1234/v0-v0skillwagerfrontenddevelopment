"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Check, ArrowLeft, Zap, Award } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/subscription"
import { useStorage } from "@/hooks/use-storage"
import { ROUTES } from "@/lib/routes"

export default function SubscriptionPage() {
  const [user] = useStorage("user", null)
  const [currentTier, setCurrentTier] = useStorage("userSubscription", { tier: "free" })
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  const plans = Object.values(SUBSCRIPTION_PLANS)

  const getPriceDisplay = (plan: any) => {
    if (plan.price === 0) return "Free"
    if (billingPeriod === "annual") {
      return `$${(plan.price * 12 * 0.8).toFixed(2)}/year` // 20% discount for annual
    }
    return `$${plan.price}/month`
  }

  const handleSubscribe = (tier: string) => {
    setCurrentTier({
      tier,
      startDate: new Date().toISOString(),
      renewalDate: "",
      autoRenew: true,
      paymentMethod: "card",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link href={ROUTES.DASHBOARD} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Unlock premium features and take your gaming to the next level
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button
              variant={billingPeriod === "monthly" ? "default" : "outline"}
              onClick={() => setBillingPeriod("monthly")}
              className="bg-primary text-primary-foreground"
            >
              Monthly
            </Button>
            <span className="text-muted-foreground">|</span>
            <Button
              variant={billingPeriod === "annual" ? "default" : "outline"}
              onClick={() => setBillingPeriod("annual")}
              className={billingPeriod === "annual" ? "bg-primary text-primary-foreground" : ""}
            >
              Annual (20% off)
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`p-6 border-2 transition-all ${
                currentTier.tier === plan.tier ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              {currentTier.tier === plan.tier && (
                <div className="mb-4 inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                  Current Plan
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold">{getPriceDisplay(plan)}</span>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {plan.tier === "pro" && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 border border-accent/40 rounded text-xs font-semibold text-accent gap-1">
                      <Zap className="w-3 h-3" />
                      Advanced
                    </span>
                  </>
                )}
                {plan.tier === "elite" && (
                  <>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-xs font-semibold text-amber-500">
                      <Award className="w-3 h-3" />
                      Premium
                    </span>
                  </>
                )}
              </div>

              <Button
                className={`w-full mb-6 ${
                  currentTier.tier === plan.tier
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={() => handleSubscribe(plan.tier)}
                disabled={currentTier.tier === plan.tier}
              >
                {currentTier.tier === plan.tier ? "Current Plan" : "Upgrade Now"}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily wagers:</span>
                  <span className="font-semibold">
                    {plan.limits.dailyWagers === 999 ? "Unlimited" : plan.limits.dailyWagers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max wager:</span>
                  <span className="font-semibold">${plan.limits.maxWagerAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tournaments:</span>
                  <span className="font-semibold">{plan.limits.tournaments ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analytics:</span>
                  <span className="font-semibold">{plan.limits.analytics ? "Advanced" : "Basic"}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-center font-semibold">Free</th>
                    <th className="p-4 text-center font-semibold">Pro</th>
                    <th className="p-4 text-center font-semibold">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "Create wagers", free: true, pro: true, elite: true },
                    { name: "Daily wager limit", free: "3", pro: "Unlimited", elite: "Unlimited" },
                    { name: "Max wager amount", free: "$100", pro: "$1,000", elite: "Unlimited" },
                    { name: "Advanced analytics", free: false, pro: true, elite: true },
                    { name: "Tournament access", free: false, pro: true, elite: true },
                    { name: "Team management", free: false, pro: false, elite: true },
                    { name: "Streaming integration", free: false, pro: true, elite: true },
                    { name: "API access", free: false, pro: false, elite: true },
                    { name: "Priority support", free: false, pro: true, elite: true },
                  ].map((feature) => (
                    <tr key={feature.name} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        {typeof feature.free === "boolean" ? (
                          feature.free ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          feature.free
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          feature.pro
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.elite === "boolean" ? (
                          feature.elite ? (
                            <Check className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )
                        ) : (
                          feature.elite
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, all premium features include a 7-day free trial. No credit card required.
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and cryptocurrency payments.
              </p>
            </Card>
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we offer 30-day money-back guarantee if you're not satisfied.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
