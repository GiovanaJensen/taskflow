import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-content.component.html',
  styleUrls: ['./dropdown-content.component.scss'],
})
export class DropdownContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() side: 'bottom'|'top'|'left'|'right' = 'bottom';
  private moved = false;
  @Input() sideOffset = 6;
  @Input() align: 'start'|'center'|'end' = 'start';
  @ViewChild('content', { static: true, read: ElementRef }) contentRef!: ElementRef<HTMLElement>;
  private portalEl?: HTMLElement;

  constructor(private host: ElementRef, private renderer: Renderer2, @Optional() private dropdown: DropdownRootComponent) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.portalEl) {
        this.portalEl = this.renderer.createElement('div');
        this.renderer.addClass(this.portalEl, 'dm-portal');
        document.body.appendChild(this.portalEl!);
    }

    const contentEl = this.contentRef.nativeElement;
    this.portalEl!.appendChild(contentEl);
    contentEl.style.display = 'none';
   }


  ngDoCheck() {
    if (!this.portalEl) return;

    const isOpen = this.dropdown?.open;

    if (isOpen) {
        this.showPortal();
    } else {
        this.hidePortal();
    }
  }

  showPortal() {
    const el = this.contentRef.nativeElement;
    el.style.display = 'block';
    this.updatePosition();
    this.registerItems();
    }

    hidePortal() {
    const el = this.contentRef.nativeElement;
    el.style.display = 'none';
    }

  ngOnDestroy() {
    if (this.portalEl) {
      try { document.body.removeChild(this.portalEl); } catch {}
    }
  }

  updatePosition() {
    if (!this.dropdown || !this.contentRef) return;
    const trigger = this.dropdown.host.nativeElement.querySelector('button, [role="button"], app-dropdown-trigger') as HTMLElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const el = this.contentRef.nativeElement;
    const offset = this.sideOffset;
    let top = rect.bottom + offset;
    let left = rect.left;

    if (this.side === 'top') top = rect.top - el.offsetHeight - offset;
    if (this.side === 'right') { left = rect.right + offset; top = rect.top; }
    if (this.side === 'left') { left = rect.left - el.offsetWidth - offset; top = rect.top; }

    // alignment adjustments: start/center/end
    if (this.align === 'center') left = rect.left + rect.width/2 - el.offsetWidth/2;
    if (this.align === 'end') left = rect.right - el.offsetWidth;

    el.style.position = 'absolute';
    el.style.top = `${Math.max(8, top)}px`;
    el.style.left = `${Math.max(8, left)}px`;
    el.style.zIndex = '1100';
  }

  registerItems() {
    if (!this.dropdown) return;
    const items = Array.from(this.contentRef.nativeElement.querySelectorAll<HTMLElement>('[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], .dm-item')) as HTMLElement[];
    items.forEach(i => this.dropdown.registerItem(i));
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event) {
    if (!this.dropdown) return;
    const target = e.target as Node;
    const inside = this.contentRef?.nativeElement.contains(target as Node) || this.dropdown.host.nativeElement.contains(target as Node);
    if (!inside) this.dropdown.close();
  }

  onKeydown(e: KeyboardEvent) {
    if (!this.dropdown) return;
    if (e.key === 'Escape') {
      this.dropdown.close();
      (this.dropdown.host.nativeElement.querySelector('button') as HTMLElement)?.focus();
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = this.dropdown.items;
      if (!items.length) return;
      const currentIndex = items.indexOf(document.activeElement as HTMLElement);
      let nextIndex = currentIndex;
      if (e.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length;
      else nextIndex = (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    }
  }
}