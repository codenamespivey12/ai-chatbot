import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '@/hooks/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProfileFormData {
  name: string;
  location: string;
  mojoHypeLevel: 'as-is' | 'chill' | 'turn-up';
}

const ProfileForm: React.FC = () => {
  const { user, updateUserProfile } = useAuthStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      location: user?.location || '',
      mojoHypeLevel: user?.mojoHypeLevel || 'as-is',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        location: user.location || '',
        mojoHypeLevel: user.mojoHypeLevel || 'as-is',
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUserProfile(data);
      toast.success('POW! Profile Updated!', {
        description: "Mojo's got the new dirt on ya. This'll be good.",
        duration: 3000,
        style: {
          background: 'var(--mojo-green)',
          color: 'white',
          border: '2px solid var(--comic-ink)',
        }
      });
      reset(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error('BLAMMO! Update Failed.', {
        description: "Something went sideways. Try again, or don't. Mojo's busy.",
        duration: 3000,
        style: {
          background: 'var(--mojo-red)',
          color: 'white',
          border: '2px solid var(--comic-ink)',
        }
      });
    }
  };

  const inputGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div variants={inputGroupVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="name" className="text-lg font-heading text-mojo-blue dark:text-mojo-blue-light">
            Your Name (or Alias, whatever floats your boat):
          </Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            placeholder="Mojo McMojoFace"
            className="font-sans"
            disabled={isSubmitting}
          />
          {errors.name && <span className="text-mojo-red text-xs">{errors.name.message}</span>}
        </motion.div>
        <motion.div variants={inputGroupVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="location" className="text-lg font-heading text-mojo-blue dark:text-mojo-blue-light">
            Where are you beaming in from?
          </Label>
          <Input
            id="location"
            {...register('location', { required: 'Location is required' })}
            placeholder="The Batcave, Gotham City"
            className="font-sans"
            disabled={isSubmitting}
          />
          {errors.location && <span className="text-mojo-red text-xs">{errors.location.message}</span>}
        </motion.div>
        <motion.div variants={inputGroupVariants} initial="hidden" animate="visible" className="space-y-2">
          <Label htmlFor="mojoHypeLevel" className="text-lg font-heading text-mojo-blue dark:text-mojo-blue-light">
            Mojo Hype Level
          </Label>
          <Controller
            control={control}
            name="mojoHypeLevel"
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                <SelectTrigger id="mojoHypeLevel" className="font-sans">
                  <SelectValue placeholder="Select your hype level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="as-is">As-Is (Default Mojo)</SelectItem>
                  <SelectItem value="chill">Chill (Mojo on decaf)</SelectItem>
                  <SelectItem value="turn-up">Turn Up (Mojo goes wild!)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </motion.div>
        <Button type="submit" className="w-full font-heading text-xl" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </>
  );
};

export default ProfileForm;