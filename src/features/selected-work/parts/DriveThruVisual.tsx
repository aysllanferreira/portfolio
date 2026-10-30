import { CarFront, Check, Zap } from "lucide-react";

import { driveThru } from "../content";

/**
 * A drive-thru lane drawn in markup, not an image: the Menu app board, the POS order
 * and the event that syncs them. It is one figure for assistive technology, described
 * by a localized label; the depicted prices and items are not read one by one.
 */
export function DriveThruVisual({ label }: { label: string }) {
  const { menu, pos } = driveThru;

  return (
    <figure
      role="img"
      aria-label={label}
      className="glass flex w-full shrink-0 flex-col overflow-hidden rounded-[20px] shadow-panel-lg [--glass-edge-stop:60%] desktop:fluid-w-620"
    >
      <div className="flex items-center justify-between px-5 py-3.5 shadow-[inset_0_-1px_0_var(--color-border)]">
        <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.4px] text-text-muted uppercase">
          <CarFront aria-hidden className="size-[15px]" strokeWidth={2} />
          {driveThru.lane}
        </span>
        <span className="flex items-center gap-1.5 rounded-pill bg-[#a493ff1a] px-2.5 py-1 font-mono text-[11px] tracking-[0.4px] text-accent uppercase">
          <span className="size-1.5 rounded-full bg-accent" />
          {driveThru.live}
        </span>
      </div>

      <div className="flex flex-col gap-3.5 p-3.5 tablet:flex-row tablet:p-5">
        <div className="flex flex-1 flex-col gap-3.5 rounded-[12px] bg-bg p-[18px] ring-1 ring-border ring-inset">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.4px]">
            <span className="text-text-faint uppercase">{menu.title}</span>
            <span className="text-text-muted">{menu.sync}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-[10px] bg-linear-225 from-[#ff7a3d] to-[#c2410c] p-4">
            <span className="font-mono text-[11px] tracking-[0.4px] text-[#ffe7d6] uppercase">
              {menu.promo.kicker}
            </span>
            <span className="text-[20px] font-bold text-white">{menu.promo.name}</span>
            <span className="text-[15px] font-semibold text-[#ffe7d6]">{menu.promo.price}</span>
          </div>
          {menu.groups.map((group) => (
            <div key={group.name} className="flex flex-col gap-3.5">
              <span className="font-mono text-[11px] tracking-[1.2px] text-[#ff9a66] uppercase">
                {group.name}
              </span>
              {group.items.map(([item, price]) => (
                <span
                  key={item}
                  className="flex items-center justify-between text-[14px] text-text-primary"
                >
                  {item}
                  <span className="font-semibold">{price}</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-[12px] bg-[#17171f] p-[18px] ring-1 ring-border ring-inset tablet:w-[230px] tablet:shrink-0">
          <span className="font-mono text-[11px] tracking-[0.4px] text-text-faint uppercase">
            {pos.title}
          </span>
          <span className="text-[17px] font-semibold text-text-primary">{pos.order}</span>
          <div className="flex flex-col gap-2.5 py-3 shadow-[inset_0_1px_0_var(--color-border),inset_0_-1px_0_var(--color-border)]">
            {pos.lines.map(([qty, item, price]) => (
              <span key={item} className="flex gap-2 text-[13px] text-text-primary">
                <span className="font-mono text-caption tracking-[0.4px] text-text-muted">
                  {qty}
                </span>
                <span className="flex-1">{item}</span>
                {price}
              </span>
            ))}
          </div>
          <span className="flex items-center justify-between">
            <span className="text-[14px] text-text-muted">{pos.totalLabel}</span>
            <span className="text-[22px] font-semibold text-text-primary">{pos.total}</span>
          </span>
          <span className="hidden flex-1 tablet:block" />
          <span className="flex items-center justify-center gap-2 rounded-sm bg-accent px-3 py-2.5 text-caption font-semibold text-on-accent">
            <Check className="size-3.5" strokeWidth={2.4} />
            {pos.confirm}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 px-5 py-3 shadow-[inset_0_1px_0_var(--color-border)]">
        <Zap className="size-[13px] text-accent" strokeWidth={2} />
        <span className="font-mono text-[10px] tracking-[0.4px] text-text-primary tablet:text-caption">
          {driveThru.event}
        </span>
      </div>
    </figure>
  );
}
