'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Plus, X, Download, Edit } from 'lucide-react';

export default function TestUIPage() {
    return (
        <div className="p-10 space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-6">Button Variations (Based on Images)</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Image 0: Primary with Plus icon */}
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="primary" shape="rounded">
                            <Plus /> Add Store
                        </Button>
                        <span className="text-xs text-muted-foreground">Primary + Rounded</span>
                    </div>

                    {/* Image 1: Outline/Export CSV */}
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" shape="rounded" className="text-black border-zinc-300">
                            Export CSV
                        </Button>
                        <span className="text-xs text-muted-foreground">Outline + Rounded</span>
                    </div>

                    {/* Image 2: Black Edit button */}
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="black" shape="rounded">
                            <Edit /> Edit
                        </Button>
                        <span className="text-xs text-muted-foreground">Black + Rounded</span>
                    </div>

                    {/* Image 3: Long Pill button */}
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="primary" shape="pill" className="w-64">
                            Log in
                        </Button>
                        <span className="text-xs text-muted-foreground">Primary + Pill + W-64</span>
                    </div>

                    {/* Image 4: Circle Icon button */}
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="primary" shape="circle" size="icon">
                            <X className="size-6" />
                        </Button>
                        <span className="text-xs text-muted-foreground">Primary + Circle + Icon</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">More Theme Variations</h2>
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="gradient" shape="rounded">
                        Gradient Button
                    </Button>

                    <Button variant="secondary" shape="rounded">
                        Secondary Button
                    </Button>

                    <Button variant="ghost" shape="rounded">
                        Ghost Button
                    </Button>

                    <Button variant="link">
                        Link Button
                    </Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Sizes</h2>
                <div className="flex flex-wrap gap-4 items-end">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Download /></Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Form Fields (Based on Image Reference)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        helperText="Must be at least 8 characters."
                    />

                    <Input
                        label="Username"
                        placeholder="Enter username"
                        error="This username is already taken."
                    />

                    <Select
                        label="Industry"
                        options={[
                            { label: 'Technology', value: 'tech' },
                            { label: 'Finance', value: 'finance' },
                            { label: 'Healthcare', value: 'health' },
                        ]}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Tell us about yourself"
                        className="md:col-span-2"
                    />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-6">Interactive Elements</h2>
                <div className="flex flex-col gap-4">
                    <Checkbox id="test-1" label="Accept Terms and Conditions" />
                    <Checkbox id="test-2" label="Remember my preferences" defaultChecked />
                    <Checkbox id="test-3" label="Disabled Checkbox" disabled />
                </div>
            </section>
        </div>
    );
}
