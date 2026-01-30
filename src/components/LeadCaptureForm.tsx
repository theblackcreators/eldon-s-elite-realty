import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { neighborhoods } from '@/data/neighborhoods';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Home } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  neighborhood: z.string().optional(),
  zipCode: z.string().optional(),
  propertyType: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  defaultNeighborhood?: string;
  leadMagnet?: string;
  variant?: 'default' | 'compact';
}

const LeadCaptureForm = ({ 
  title = "Get Your Free Market Report",
  description = "Enter your information to receive exclusive market insights for your neighborhood",
  defaultNeighborhood,
  leadMagnet,
  variant = 'default'
}: LeadCaptureFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      neighborhood: defaultNeighborhood || '',
    }
  });

  const selectedNeighborhood = watch('neighborhood');
  const selectedZip = watch('zipCode');

  // Auto-populate ZIP when neighborhood is selected
  const handleNeighborhoodChange = (value: string) => {
    setValue('neighborhood', value);
    const neighborhood = neighborhoods.find(n => n.id === value);
    if (neighborhood && neighborhood.zipCodes.length > 0) {
      setValue('zipCode', neighborhood.zipCodes[0]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Create lead tag in format: ZIP-Neighborhood
    const neighborhood = neighborhoods.find(n => n.id === data.neighborhood);
    const leadTag = data.zipCode && neighborhood 
      ? `${data.zipCode}-${neighborhood.name}`
      : 'General Inquiry';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Lead Capture Data:', {
      ...data,
      leadTag,
      leadMagnet,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Success!",
      description: leadMagnet 
        ? `Your ${leadMagnet} will be sent to ${data.email} shortly.`
        : "Thank you! I'll be in touch soon.",
    });

    setIsSubmitting(false);
  };

  if (variant === 'compact') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register('firstName')} />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register('lastName')} />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="neighborhood">Neighborhood of Interest</Label>
              <Select value={selectedNeighborhood} onValueChange={handleNeighborhoodChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map(n => (
                    <SelectItem key={n.id} value={n.id}>
                      {n.name} ({n.zipCodes.join(', ')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Free Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="flex items-center gap-2">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input id="firstName" {...register('firstName')} placeholder="John" />
              {errors.firstName && (
                <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName" className="flex items-center gap-2">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input id="lastName" {...register('lastName')} placeholder="Doe" />
              {errors.lastName && (
                <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email <span className="text-destructive">*</span>
            </Label>
            <Input id="email" type="email" {...register('email')} placeholder="john.doe@example.com" />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input id="phone" type="tel" {...register('phone')} placeholder="(409) 223-7288" />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="neighborhood" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Neighborhood of Interest
            </Label>
            <Select value={selectedNeighborhood} onValueChange={handleNeighborhoodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a neighborhood" />
              </SelectTrigger>
              <SelectContent>
                {neighborhoods.map(n => (
                  <SelectItem key={n.id} value={n.id}>
                    {n.name} ({n.zipCodes.join(', ')})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedNeighborhood && (
            <div>
              <Label htmlFor="zipCode" className="flex items-center gap-2">
                ZIP Code
              </Label>
              <Select value={selectedZip} onValueChange={(value) => setValue('zipCode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ZIP code" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods
                    .find(n => n.id === selectedNeighborhood)
                    ?.zipCodes.map(zip => (
                      <SelectItem key={zip} value={zip}>
                        {zip}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="propertyType" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              I'm Interested In
            </Label>
            <Select onValueChange={(value) => setValue('propertyType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buying">Buying a Home</SelectItem>
                <SelectItem value="selling">Selling a Home</SelectItem>
                <SelectItem value="both">Both Buying & Selling</SelectItem>
                <SelectItem value="investing">Investment Property</SelectItem>
                <SelectItem value="information">Just Gathering Information</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Additional Comments</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell me about your real estate goals..."
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : leadMagnet ? `Get ${leadMagnet}` : 'Submit'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to be contacted by Eldon Peterson regarding your real estate needs.
            Your information will never be shared with third parties.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;

